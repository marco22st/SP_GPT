package at.htlle.cheatgpt;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long messageid;
    private String role;
    private String message;

    @ManyToOne
    @JoinColumn(name = "historyid")
    private ChatHistory chatHistory;

    public long getMessageid() {
        return messageid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ChatHistory getChatHistory() {
        return chatHistory;
    }

    public void setChatHistory(ChatHistory chatHistory) {
        this.chatHistory = chatHistory;
    }
}
