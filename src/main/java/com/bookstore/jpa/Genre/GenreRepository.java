package com.bookstore.jpa.Genre;

import org.springframework.data.repository.CrudRepository;

public interface GenreRepository extends CrudRepository<Genre, Long> {
    Genre findById(long id);
}

