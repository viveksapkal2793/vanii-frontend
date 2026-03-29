"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, Sparkles } from "lucide-react";
import { PostGenerateFeedback } from "@/lib/apis/sessions/session-apis";
import { UserSession } from "@/types/sessions";
import useAxiosContext from "@/hooks/custom/useAxiosContext";
import { toast } from "@/hooks/use-toast";

interface GetFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: UserSession;
}

interface GeneratedFeedback {
  type: 'positive' | 'negative' | 'neutral';
  title: string;
  content: string;
}

const GetFeedbackModal: React.FC<GetFeedbackModalProps> = ({
  isOpen,
  onClose,
  session,
}) => {
  const axios = useAxiosContext();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<GeneratedFeedback | null>(null);

  const handleGenerateFeedback = async () => {
    if (!session.chatHistory || session.chatHistory.length === 0) {
      toast({
        title: "No Chat History",
        description: "This session doesn't have any chat messages to analyze.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setFeedback(null);

    try {
      PostGenerateFeedback({
        axios,
        data: { sessionId: session._id },
        onSuccess: (response) => {
          console.log('Feedback response:', response);
          setFeedback(response.data.feedback);
          setLoading(false);
          toast({
            title: "Feedback Generated",
            description: "AI has analyzed your conversation and generated feedback.",
          });
        },
        onError: (error) => {
          console.error('Error generating feedback:', error);
          setLoading(false);
          toast({
            title: "Error",
            description: "Failed to generate feedback. Please try again.",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error('Error generating feedback:', error);
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to generate feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getFeedbackTypeColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'neutral':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'positive':
        return '✅';
      case 'negative':
        return '❌';
      case 'neutral':
        return '💡';
      default:
        return '📝';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Conversation Feedback
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>Session #{session._id.slice(-6)}</p>
            <p>Messages: {session.chatHistory?.length || 0}</p>
            <p>Date: {new Date(session.startTime).toLocaleDateString()}</p>
          </div>

          {!feedback && !loading && (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Get AI Feedback</h3>
              <p className="text-muted-foreground mb-4">
                Let our AI analyze your conversation with Vartalaap and provide personalized feedback
                on your language learning progress.
              </p>
              <Button onClick={handleGenerateFeedback} className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Generate Feedback
              </Button>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin text-purple-600" />
              <h3 className="text-lg font-semibold mb-2">Analyzing Conversation...</h3>
              <p className="text-muted-foreground">
                Our AI is reviewing your chat history and generating personalized feedback.
              </p>
            </div>
          )}

          {feedback && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getFeedbackIcon(feedback.type)}</span>
                <Badge className={getFeedbackTypeColor(feedback.type)}>
                  {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)}
                </Badge>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-lg mb-2">{feedback.title}</h4>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {feedback.content}
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleGenerateFeedback} variant="outline" size="sm">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate New Feedback
                </Button>
                <Button onClick={onClose} variant="default" size="sm">
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GetFeedbackModal;
