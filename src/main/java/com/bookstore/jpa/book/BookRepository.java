package com.bookstore.jpa.book;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;
import java.util.List;

@RepositoryRestResource(collectionResourceRel = "books", path = "books")
public interface BookRepository extends PagingAndSortingRepository<Book, Long> {
    List<Book> findByTitle(@Param("title") String title);
    List<Book> findByTitleContaining(@Param("title") String title);
    Book findById(long id);
    Collection<Book> findAll();
}