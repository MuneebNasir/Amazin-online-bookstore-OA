package com.bookstore.jpa.user;

import org.springframework.data.repository.CrudRepository;

public interface UserAccountRepository extends CrudRepository<UserAccount, Long> {
    UserAccount findById(long id);
}
