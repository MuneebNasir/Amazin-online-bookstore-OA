package com.bookstore.jpa.author;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AuthorRepository extends CrudRepository<Author, Long> {
    Author findById(long id);
    void deleteById(long id);
    List<Author> findAll();
}
