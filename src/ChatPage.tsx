import React, { useState, useRef, useEffect } from "react";

// --- CẤU HÌNH API ---
const API_KEY = "AIzaSyDEIOTfJFro2tbg7RQCNKTZuUUQaGKzC5o"; // Key từ code Python của bạn
const MODEL_NAME = "models/gemini-2.5-flash"; // Đã đổi sang 1.5 để ổn định (bạn có thể đổi lại 2.5)
const API_URL = `https://generativelanguage.googleapis.com/v1beta/${MODEL_NAME}:generateContent?key=${API_KEY}`;

interface Message {
  role: "user" | "bot";
  text: string;
}

const ChatPage = () => {
  // Quản lý danh sách tin nhắn
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Xin chào! Tôi là trợ lý ảo AI. Tôi có thể giúp gì cho bạn?",
    },
  ]);

  // Quản lý nội dung nhập và trạng thái loading
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ref để tự động cuộn xuống cuối khi có tin nhắn mới
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- LOGIC GỌI API (Tương đương class ChatService trong Python) ---
  const sendMessageToGemini = async (userMessage: string) => {
    try {
      const payload = {
        contents: [
          {
            parts: [{ text: userMessage }],
          },
        ],
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Lỗi API: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      // Parse kết quả (Tương đương: data["candidates"][0]["content"]["parts"][0]["text"])
      const botReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi.";
      return botReply;
    } catch (error) {
      console.error("Error:", error);
      return "❌ Xin lỗi, tôi đang gặp sự cố kết nối.";
    }
  };

  // --- XỬ LÝ KHI NGƯỜI DÙNG GỬI TIN ---
  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput(""); // Xóa ô nhập liệu
    setIsLoading(true);

    // 1. Thêm tin nhắn người dùng vào list
    setMessages((prev) => [...prev, { role: "user", text: userText }]);

    // 2. Gọi API lấy phản hồi
    const botResponse = await sendMessageToGemini(userText);

    // 3. Thêm tin nhắn Bot vào list
    setMessages((prev) => [...prev, { role: "bot", text: botResponse }]);
    setIsLoading(false);
  };

  // Xử lý khi nhấn Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // --- GIAO DIỆN (UI) ---
  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {/* Header */}
        <div style={styles.header}>
          <h3>Chatbot HCE AI</h3>
        </div>

        {/* Khu vực hiển thị tin nhắn */}
        <div style={styles.messageList}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.messageRow,
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.bubble,
                  backgroundColor: msg.role === "user" ? "#007bff" : "#e9ecef",
                  color: msg.role === "user" ? "#fff" : "#000",
                }}
              >
                {/* Xử lý xuống dòng cho text */}
                {msg.text.split("\n").map((line, i) => (
                  <p key={i} style={{ margin: 0, minHeight: "1em" }}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {/* Hiển thị loading khi đang chờ */}
          {isLoading && (
            <div style={styles.messageRow}>
              <div
                style={{
                  ...styles.bubble,
                  backgroundColor: "#e9ecef",
                  fontStyle: "italic",
                  color: "#666",
                }}
              >
                Đang suy nghĩ...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Khu vực nhập liệu */}
        <div style={styles.inputArea}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập tin nhắn..."
            disabled={isLoading}
          />
          <button
            style={{
              ...styles.sendButton,
              backgroundColor: isLoading ? "#ccc" : "#2c3e50",
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onClick={handleSend}
            disabled={isLoading}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

// --- STYLES (CSS-in-JS) ---
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "calc(100vh - 100px)", // Trừ đi header của Layout
    backgroundColor: "#f0f2f5",
    padding: "20px",
    marginTop: "30px",
  },
  chatBox: {
    width: "100%",
    maxWidth: "600px",
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column" as "column",
    overflow: "hidden",
  },
  header: {
    padding: "16px",
    backgroundColor: "#2c3e50",
    color: "white",
    textAlign: "center" as "center",
    borderBottom: "1px solid #ddd",
  },
  messageList: {
    flex: 1,
    padding: "20px",
    overflowY: "auto" as "auto",
    display: "flex",
    flexDirection: "column" as "column",
    gap: "10px",
  },
  messageRow: {
    display: "flex",
    width: "100%",
  },
  bubble: {
    maxWidth: "75%",
    padding: "10px 15px",
    borderRadius: "15px",
    fontSize: "15px",
    lineHeight: "1.4",
    wordWrap: "break-word" as "break-word",
  },
  inputArea: {
    padding: "15px",
    borderTop: "1px solid #eee",
    display: "flex",
    gap: "10px",
    backgroundColor: "#fafafa",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
  },
  sendButton: {
    padding: "10px 20px",
    color: "white",
    border: "none",
    borderRadius: "20px",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background 0.2s",
  },
};

export default ChatPage;
