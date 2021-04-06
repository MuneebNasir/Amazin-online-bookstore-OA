package com.bookstore.jpa.user;

import com.bookstore.jpa.role.Role;

import javax.persistence.*;

@Entity
public class UserAccount {

    @Id
    @GeneratedValue(generator = "user", strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    @ManyToOne
    private Role role;

    public UserAccount() { }

    public UserAccount(String name, String email, Role role) {
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
