import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const MemoryWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatResponse = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/<u>(.*?)<\/u>/g, '<u>$1</u>');
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const dateCode = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      
      const response = await fetch('https://n8n.a3innercircle.com/webhook/e926a6b0-1bc1-4aec-a665-76da4683c46c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: dateCode,
          message: inputValue
        }),
      });

      const data = await response.json();
      
      if (data && Array.isArray(data) && data[0]?.output) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data[0].output,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-border w-80 h-96 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                <img 
                  src="https://static.vecteezy.com/system/resources/previews/049/697/634/non_2x/detailed-brain-graphic-brain-anatomy-illustration-vector.jpg"
                  alt="Memory"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Agora AI</h3>
                <p className="text-xs text-white/70">AI Assistant</p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm py-8">
                <p>Start a conversation with Agora AI</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className="max-w-[80%]">
                  {!message.isUser && (
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img 
                          src="https://static.vecteezy.com/system/resources/previews/049/697/634/non_2x/detailed-brain-graphic-brain-anatomy-illustration-vector.jpg"
                          alt="Memory"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm ${
                      message.isUser
                        ? 'bg-primary text-white rounded-br-md'
                        : 'bg-white border border-border rounded-bl-md'
                    }`}
                  >
                    {message.isUser ? (
                      message.content
                    ) : (
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: formatResponse(message.content) 
                        }} 
                      />
                    )}
                  </div>
                  
                  <div className={`text-xs text-muted-foreground mt-1 ${
                    message.isUser ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%]">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <img 
                        src="https://static.vecteezy.com/system/resources/previews/049/697/634/non_2x/detailed-brain-graphic-brain-anatomy-illustration-vector.jpg"
                        alt="Memory"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="bg-white border border-border rounded-2xl rounded-bl-md px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce animation-delay-100"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce animation-delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-white">
            <div className="flex space-x-2">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 min-h-[40px] max-h-[100px] resize-none border-border"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="icon"
                className="h-10 w-10 bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryWidget;