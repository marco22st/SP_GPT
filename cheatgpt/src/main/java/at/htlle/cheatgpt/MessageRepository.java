package at.htlle.cheatgpt;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@RepositoryRestResource(collectionResourceRel = "message", path = "message")
public interface MessageRepository extends PagingAndSortingRepository<Message, Long>, CrudRepository<Message, Long> {
    List<Message> findByChatHistory(@Param("history") ChatHistory histroy);
}

