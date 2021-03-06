package com.bookstore.controller.book;

import com.bookstore.jpa.author.Author;
import com.bookstore.jpa.author.AuthorRepository;
import com.bookstore.jpa.book.Book;
import com.bookstore.jpa.publisher.Publisher;
import com.bookstore.jpa.publisher.PublisherRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(locations = "classpath:test.properties")
public class BookControllerTest {

    @Autowired
    private MockMvc bookController;
    @Autowired
    AuthorRepository authorRepo;
    @Autowired
    PublisherRepository publisherRepo;

    @Test
    public void testGetBookByID() throws Exception {
        bookController.perform(MockMvcRequestBuilders
                .get("/api/book/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testEmptyNewBook() throws Exception {
        try {
            Book book = new Book();
            bookController.perform(MockMvcRequestBuilders
                    .post("/api/addNewBook")
                    .param("authorId", "2")
                    .param("publisherId", "2")
                    .content(asJsonString(book))
                    .contentType(MediaType.APPLICATION_JSON)
                    .accept(MediaType.APPLICATION_JSON))
                    .andDo(print())
                    .andExpect(status().isCreated());
        } catch (Exception e) {
            Assert.assertTrue("Exception Accepted", e instanceof RuntimeException);
        }

    }

    @Test
    public void testAddingNewBook() throws Exception {
        Book book = new Book(
                "Lord of the Rings",
                "Bretty Gud",
                1992,
                "ABC",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/addNewBook")
                .param("authorId", "1")
                .param("publisherId", "1")
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());
    }


    @Test
    public void testUpdateBookInfo() throws Exception {
        Author bookAuthor2 = new Author("Jane", "Doe", null);
        authorRepo.save(bookAuthor2);

        Publisher publisher = new Publisher("Jane", "Ottawa", null);
        publisherRepo.save(publisher);

        Book book = new Book(
                "Lord of the Rings",
                "Bretty Gud",
                1992,
                "ABC",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/addNewBook")
                .param("authorId", "1")
                .param("publisherId", "1")
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        // Updating Existing Book Description
        book.setDescription("This is a deadly book");
        bookController.perform(MockMvcRequestBuilders
                .put("/api/updateBook/{id}", 1)
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());

        // Confirming the Description Has Been Updated
        bookController.perform(MockMvcRequestBuilders
                .get("/api/book/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("This is a deadly book"))
                .andExpect(status().isOk());

        // Updating Existing Title
        book.setTitle("Some Body");
        bookController.perform(MockMvcRequestBuilders
                .put("/api/updateBook/{id}", 1)
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());

        // Confirming the Title Has Been Updated
        bookController.perform(MockMvcRequestBuilders
                .get("/api/book/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("This is a deadly book"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Some Body"))
                .andExpect(status().isOk());
    }

    @Test
    public void testRemoveBook() throws Exception {
        Author bookAuthor2 = new Author("Jane", "Doe", null);
        authorRepo.save(bookAuthor2);

        Publisher publisher = new Publisher("James", "NYC", null);
        publisherRepo.save(publisher);

        Book book = new Book(
                "Lord of the Rings",
                "Bretty Gud",
                1992,
                "ABC",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/addNewBook")
                .param("authorId", "2")
                .param("publisherId", "1")
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        Book book2 = new Book(
                "Testing New Addition",
                "Bretty Bad",
                132,
                "ABC",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/addNewBook")
                .param("authorId", "1")
                .param("publisherId", "1")
                .content(asJsonString(book2))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        bookController.perform(
                MockMvcRequestBuilders.delete("/api/removeBook")
                        .param("id", "2"))
                .andExpect(status().isOk());

        // GET REQUEST to ensure the specified book is deleted
        bookController.perform(MockMvcRequestBuilders
                .get("/api/book/{id}", 2)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").doesNotExist());
    }

    @Test
    public void testGetAllBooks() throws Exception {
        Author bookAuthor = new Author("James", "Bond", null);
        authorRepo.save(bookAuthor);

        Publisher publisher = new Publisher("Joe", "NYC", null);
        publisherRepo.save(publisher);

        //Adding new books
        Book book = new Book(
                "Lord of the Rings",
                "Bretty Gud",
                1992,
                "ABC",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/addNewBook")
                .param("authorId", "1")
                .param("publisherId", "1")
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        Book book2 = new Book(
                "My Fair Lady",
                "Bretty Bad",
                132,
                "ABC",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/addNewBook")
                .param("authorId", "1")
                .param("publisherId", "1")
                .content(asJsonString(book2))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        bookController.perform(MockMvcRequestBuilders
                .get("/api/allBookIDs")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[*]").exists());

        bookController.perform(MockMvcRequestBuilders
                .get("/api/booksViewAll")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[*].id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$[*].title").exists());
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
