import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: 'Hello! Welcome to SMARTFIX. How can I help you today?', isUser: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickReplies = [
    'Book a service',
    'View pricing',
    'Contact support',
    'Service areas'
  ];

  const handleSend = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages([...messages, { text: inputValue, isUser: true }]);
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = 'Thank you for your message. Our team will assist you shortly!';
      
      if (inputValue.toLowerCase().includes('price') || inputValue.toLowerCase().includes('cost')) {
        botResponse = 'Our prices vary by service. Please visit our services page or call 0932789887 for detailed pricing.';
      } else if (inputValue.toLowerCase().includes('book') || inputValue.toLowerCase().includes('appointment')) {
        botResponse = 'To book a service, please browse our services and select your preferred provider. You can also call us at 0932789887.';
      } else if (inputValue.toLowerCase().includes('contact') || inputValue.toLowerCase().includes('support')) {
        botResponse = 'You can reach us at:\n📞 0932789887\n📧 smartfix088@gmail.com\n📍 Cairo, Egypt';
      }
      
      setMessages(prev => [...prev, { text: botResponse, isUser: false }]);
    }, 1000);

    setInputValue('');
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSend();
  };

  return (
    <div className="chatbot-widget">
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="gradient-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-medium">SMARTFIX Support</h3>
                <p className="text-xs text-white/80">Online 24/7</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-gradient-to-r from-[#4FC3F7] to-[#0288D1] text-white'
                      : 'bg-white text-gray-800 shadow-sm'
                  }`}
                  style={{
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="p-3 bg-white border-t flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                className="gradient-primary text-white btn-shadow"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-button"
        aria-label="Open chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
