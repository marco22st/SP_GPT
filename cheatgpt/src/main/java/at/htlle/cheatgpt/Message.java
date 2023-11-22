package at.htlle.cheatgpt;

import jakarta.persistence.*;

@Entity
@Table(
        name = "Chat_Message"
)
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "chat_message_id")
    private long messageid;
    @Column(name = "chat_message_role")
    private String role;
    @Column(name = "chat_message_content")
    private String content;

    @ManyToOne
    @JoinColumn(name = "chat_history_id")
    private ChatHistory chatHistory;

    public Message() {
    }

    public long getMessageid() {
        return messageid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public ChatHistory getChatHistory() {
        return chatHistory;
    }

    public void setChatHistory(ChatHistory chatHistory) {
        this.chatHistory = chatHistory;
    }
}
