package com.bookstore.controller.book;

import com.bookstore.jpa.book.Book;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookControllerTest {

    @Autowired
    private MockMvc bookController;

    @Test
    public void testGetBookByID() throws Exception
    {
        bookController.perform( MockMvcRequestBuilders
                .get("/api/AmazinBookStore-book/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testEmptyNewBook() throws Exception {
        Book book = new Book();
        bookController.perform(MockMvcRequestBuilders
                .post("/api/AmazinBookStore-addNewBook")
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isAccepted());
    }

    @Test
    public void testAddingNewBook() throws Exception {
        Book book = new Book(
                "Lord of the Rings",
                "Bretty Gud",
                "/shiggydiggy/",
                1992,
                "ABC",
                "Paperback",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/AmazinBookStore-addNewBook")
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isAccepted());
    }


    @Test
    public void testUpdateBookInfo() throws Exception
    {
        Book book = new Book(
                "Lord of the Rings",
                "Bretty Gud",
                "/shiggydiggy/",
                1992,
                "ABC",
                "Paperback",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/AmazinBookStore-addNewBook")
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isAccepted());

        // Updating Existing Book Description
        book.setDescription("This is a deadly book");
        bookController.perform(MockMvcRequestBuilders
                .put("/api/AmazinBookStore-updateBook/{id}",1)
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        // Confirming the Description Has Been Updated
        bookController.perform( MockMvcRequestBuilders
                .get("/api/AmazinBookStore-book/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("This is a deadly book"))
                .andExpect(status().isOk());

        // Updating Existing Title
        book.setTitle("Some Body");
        bookController.perform(MockMvcRequestBuilders
                .put("/api/AmazinBookStore-updateBook/{id}",1)
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        // Confirming the Title Has Been Updated
        bookController.perform( MockMvcRequestBuilders
                .get("/api/AmazinBookStore-book/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.description").value("This is a deadly book"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value("Some Body"))
                .andExpect(status().isOk());
    }

    @Test
    public void testRemoveBook() throws Exception
    {
        Book book = new Book(
                "Lord of the Rings",
                "Bretty Gud",
                "/shiggydiggy/",
                1992,
                "ABC",
                "Paperback",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/AmazinBookStore-addNewBook")
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isAccepted());

        Book book2 = new Book(
                "My Fair Lady",
                "Bretty Bad",
                "/shiggydiggy/",
                132,
                "ABC",
                "Paperback",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/AmazinBookStore-addNewBook")
                .content(asJsonString(book2))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isAccepted());

        bookController.perform(
                MockMvcRequestBuilders.delete("/api/AmazinBookStore-removeBook")
                        .param("id", "2"))
                .andExpect(status().isAccepted());

        // GET REQUEST to ensure the specified book is deleted
        bookController.perform( MockMvcRequestBuilders
                .get("/api/AmazinBookStore-book/{id}", 2)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").doesNotExist());
    }

    @Test
    public void testGetAllBooks() throws Exception
    {
        //Adding new books
        Book book = new Book(
                "Lord of the Rings",
                "Bretty Gud",
                "/shiggydiggy/",
                1992,
                "ABC",
                "Paperback",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/AmazinBookStore-addNewBook")
                .content(asJsonString(book))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isAccepted());

        Book book2 = new Book(
                "My Fair Lady",
                "Bretty Bad",
                "/shiggydiggy/",
                132,
                "ABC",
                "Paperback",
                420.69,
                12,
                8008.5);
        bookController.perform(MockMvcRequestBuilders
                .post("/api/AmazinBookStore-addNewBook")
                .content(asJsonString(book2))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isAccepted());

        bookController.perform( MockMvcRequestBuilders
                .get("/api/AmazinBookStore-AllBookIDs")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[*]").exists());

        bookController.perform( MockMvcRequestBuilders
                .get("/api/AmazinBookStore-booksViewAll")
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
