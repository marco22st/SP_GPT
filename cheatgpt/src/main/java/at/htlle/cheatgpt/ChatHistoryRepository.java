package at.htlle.cheatgpt;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@RepositoryRestResource(collectionResourceRel = "history", path = "history")
public interface ChatHistoryRepository extends PagingAndSortingRepository<ChatHistory, Long>, CrudRepository<ChatHistory, Long> {
    List<ChatHistory> findByTitle(@Param("title") String title);
}