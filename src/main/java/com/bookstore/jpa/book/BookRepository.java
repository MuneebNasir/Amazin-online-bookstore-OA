package com.bookstore.jpa.book;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface BookRepository extends CrudRepository<Book, Long> {
    List<Book> findByTitle(@Param("title") String title);
    List<Book> findByTitleContaining(@Param("title") String title);
    Book findById(long id);
    Collection<Book> findAll();
}