package BookStore.JPA;

import javax.persistence.*;
import java.util.Collection;

@Entity
public class Publisher {

    @Id
    @GeneratedValue(generator = "publisher", strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String location;

    public Publisher() {

    }

    public Publisher(String name, String location) {
        this.name = name;
        this.location = location;
    }

    public long getId() {
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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
