package at.htlle.cheatgpt;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(
        name = "Chat_Histroy",
        uniqueConstraints = @UniqueConstraint(columnNames = {"chat_histroy_name"})
)
public class ChatHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "chat_histroy_id")
    private long histroyid;
    @Column(name = "chat_histroy_name")
    private String title;
    @OneToMany(mappedBy = "chatHistory", fetch = FetchType.LAZY)
    private Set<Message> messages;

    public ChatHistory() {
    }

    public long getHistroyid() {
        return histroyid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }
}