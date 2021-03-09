package com.bookstore.jpa.publisher;

import javax.persistence.*;


@Entity
public class Publisher {

    @Id
    @GeneratedValue(generator = "publisher", strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;

    public Publisher() {

    }

    public Publisher(String name, String location) {
        this.name = name;
        this.location = location;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
