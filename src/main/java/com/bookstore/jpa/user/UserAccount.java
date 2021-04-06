package com.bookstore.jpa.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserAccount {

    @Id
    @GeneratedValue(generator = "user", strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private Boolean isOwner;
    private

    public UserAccount() { }

    public UserAccount(String name, String email, Boolean isOwner) {
        this.name = name;
        this.email = email;
        this.isOwner = isOwner;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getOwner() {
        return isOwner;
    }

    public void setOwner(Boolean owner) {
        isOwner = owner;
    }
}
