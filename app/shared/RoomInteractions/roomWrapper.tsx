"use client";
import { defaultConfig, LivekitProvider } from "@/context/LivekitContext";
import useAxiosContext from "@/hooks/custom/useAxiosContext";
import { GetLiveKitRoom, GetLiveKitStudyRoom } from "@/lib/apis/learn/create-room";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Room from "./room";
import { toast } from "@/hooks/use-toast";
import useAuthContext from "@/hooks/custom/useAuthContext";
import { LiveKitMetadata } from "@/types/livekit";
import { GetSessionById } from "@/lib/apis/sessions/session-apis";

type roomWrapperProps = {
  showChat: boolean;
  studyRoom?: boolean;
  data?: LiveKitMetadata
};

const RoomWrapper: React.FC<roomWrapperProps> = ({ showChat,data, studyRoom=false }) => {
  const axios = useAxiosContext();
  const auth = useAuthContext();
  const searchParams = useSearchParams();
  const [livekitConfig, setLivekitConfig] = useState(defaultConfig);

  // Get session info from URL parameters
  const sessionId = searchParams.get('sessionId');
  const previousSessionId = searchParams.get('previousSessionId');
  const roomName = searchParams.get('roomName');
  const rejoined = searchParams.get('rejoined') === 'true';

  // Load session data if sessionId or previousSessionId is provided
  useEffect(() => {
    const targetSessionId = sessionId || previousSessionId;
    if (targetSessionId && auth.config.loggedIn) {
      GetSessionById({
        axios,
        sessionId: targetSessionId,
        onSuccess: (response) => {
          if (previousSessionId) {
            toast({
              title: "Previous Session Context Loaded",
              description: `Starting new session with context from ${new Date(response.data.startTime).toLocaleDateString()}`,
            });
          } else if (rejoined) {
            toast({
              title: "Session Rejoined",
              description: `Successfully rejoined session from ${new Date(response.data.startTime).toLocaleDateString()}`,
            });
          } else {
            toast({
              title: "Session Loaded",
              description: `Continuing session from ${new Date(response.data.startTime).toLocaleDateString()}`,
            });
          }
        },
        onError: (error) => {
          console.error('Error loading session metadata:', error);
          // Don't show error toast for session metadata loading failure
          // as it doesn't affect the actual session functionality
        },
      });
    }
  }, [sessionId, previousSessionId, auth.config.loggedIn, axios, rejoined]);

  useEffect(() => {
    // Check if we have a room token from continuing a session
    const roomToken = sessionStorage.getItem('roomToken');

    if (roomToken) {
      // Use the token from continuing a session (from sessions page)
      setLivekitConfig((prevValues) => {
        return {
          ...prevValues,
          serverUrl: "wss://vanii-wat801kw.livekit.cloud",
          token: roomToken,
          isConnected: true,
          sessionId: sessionId || undefined,
        };
      });
      // Clean up the stored token
      sessionStorage.removeItem('roomToken');
    } else if (rejoined && roomName && sessionId) {
      // For rejoined sessions, use the token from sessionStorage
      const rejoinedToken = sessionStorage.getItem('rejoinedSessionToken');
      if (rejoinedToken) {
        setLivekitConfig((prevValues) => {
          return {
            ...prevValues,
            serverUrl: "wss://vanii-wat801kw.livekit.cloud",
            token: rejoinedToken,
            roomName: roomName,
            sessionId: sessionId || undefined,
            isConnected: true,
          };
        });
        // Clean up the stored token
        sessionStorage.removeItem('rejoinedSessionToken');
      } else {
        toast({
          title: "Error",
          description: "Failed to rejoin session. Missing authentication token.",
          variant: "destructive",
        });
      }
    } else if (previousSessionId && !rejoined && !studyRoom) {
      // For continuing completed learning sessions, create a new room with context
      GetLiveKitRoom({
        axios,
        onSuccess: (response) => {
          setLivekitConfig((prevValues) => {
            return {
              ...prevValues,
              serverUrl: "wss://vanii-wat801kw.livekit.cloud",
              token: response.data.token,
              isConnected: true,
              sessionId: response.data.sessionId,
            };
          });
        },
        onError: (error) => {
          console.log(error);
          toast({ title: "Error", description: error.message });
        },
      });
    } else if (auth.config.loggedIn && studyRoom && data) {
      // Only create new study room if we don't have a token from continuing a session
      GetLiveKitStudyRoom({
        axios,
        data,
        onSuccess: (response) => {
          setLivekitConfig((prevValues) => {
            return {
              ...prevValues,
              token: response.data.token,
              isConnected: true,
              sessionId: response.data.sessionId,
            };
          });
        },
        onError: (error) => {
          console.log(error);
          toast({ title: "Error", description: error.message });
        },
      });
    } else if (auth.config.loggedIn && !studyRoom && !rejoined && !previousSessionId) {
      // Only create a new room if we're not rejoining an existing session or continuing with context
      GetLiveKitRoom({
        axios,
        onSuccess: (response) => {
          setLivekitConfig((prevValues) => {
            return {
              ...prevValues,
              serverUrl: "wss://vanii-wat801kw.livekit.cloud",
              token: response.data.token,
              isConnected: true,
              sessionId: response.data.sessionId,
            };
          });
        },
        onError: (error) => {
          console.log(error);
          toast({ title: "Error", description: error.message });
        },
      });
    }
    

    return () => {
      // Room will be automatically deleted by SPS microservice when user leaves
      // No need to call delete room API
      setLivekitConfig((prevValues) => {
        return {
          ...prevValues,
          token: "",
          isConnected: false,
        };
      });
    };
  }, [axios, auth.config, rejoined, roomName, sessionId, studyRoom, data, previousSessionId]);

  return (
    <>
      <LivekitProvider
        value={{ config: livekitConfig, setConfig: setLivekitConfig }}
      >
        <LiveKitRoom
          video={false}
          audio={true}
          token={livekitConfig.token}
          serverUrl={livekitConfig.serverUrl}
          style={{ height: "fit-content" }}
          onError={(error) => {
            console.log(error);
          }}
        >
          <Room showChat={showChat} />
          {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
          <RoomAudioRenderer />
        </LiveKitRoom>
      </LivekitProvider>
    </>
  );
};

export default RoomWrapper;
