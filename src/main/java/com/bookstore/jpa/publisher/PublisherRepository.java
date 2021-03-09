package com.bookstore.jpa.publisher;

import org.springframework.data.repository.CrudRepository;

public interface PublisherRepository extends CrudRepository<Publisher, Long> {
    Publisher findById(long id);
}
