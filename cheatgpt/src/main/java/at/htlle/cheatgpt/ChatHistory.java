package at.htlle.cheatgpt;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class ChatHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long histroyid;
    private String title;
    @OneToMany(mappedBy = "chatHistory")
    private Set<Message> messages;

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