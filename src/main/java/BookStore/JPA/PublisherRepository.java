package BookStore.JPA;

import org.springframework.data.repository.CrudRepository;

public interface PublisherRepository extends CrudRepository<Publisher, Long> {
    Publisher findById(long id);
}
