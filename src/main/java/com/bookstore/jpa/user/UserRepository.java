package com.bookstore.jpa.user;

import com.bookstore.jpa.book.Book;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
    Book findById(long id);
}
