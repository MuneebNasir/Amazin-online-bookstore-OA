package com.bookstore.jpa.publisher;

import com.bookstore.jpa.book.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface PublisherRepository extends CrudRepository<Publisher, Long> {
    Publisher findById(long id);

    Collection<Publisher> findAll();
    List<Publisher> findByNameContaining(@Param("name") String name);
}
