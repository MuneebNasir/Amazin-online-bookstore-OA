package BookStore.JPA;

import org.springframework.data.repository.CrudRepository;
import java.util.Collection;

public interface PublisherRepository extends CrudRepository<Publisher, Long> {
    Publisher findById(long id);

    Collection<Publisher> findAll();
}
