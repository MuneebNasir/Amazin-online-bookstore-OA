package BookStore.JPA;

import javax.persistence.*;

@Entity
public class Author {

    @Id
    @GeneratedValue(generator = "author", strategy = GenerationType.IDENTITY)
    private Long id;

    private String fName;
    private String lName;

    @ManyToOne(fetch = FetchType.LAZY)
    private Book aBook;

    public Author() {

    }

    public Author(String fName, String lName) {
        this.fName = fName;
        this.lName = lName;
    }

    public String getfName() {
        return fName;
    }

    public void setfName(String fName) {
        this.fName = fName;
    }

    public String getlName() {
        return lName;
    }

    public void setlName(String lName) {
        this.lName = lName;
    }

    public Book getaBook() {
        return aBook;
    }

    public void setaBook(Book aBook) {
        this.aBook = aBook;
    }
}
