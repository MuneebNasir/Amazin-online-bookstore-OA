package com.bookstore.jpa.role;

import com.bookstore.jpa.user.UserAccount;

import javax.persistence.*;
import java.util.List;

@Entity
public class Role {

    @Id
    private String name;

    @OneToMany
    private List<UserAccount> users;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<UserAccount> getUsers() {
        return users;
    }

    public void setUsers(List<UserAccount> users) {
        this.users = users;
    }
}