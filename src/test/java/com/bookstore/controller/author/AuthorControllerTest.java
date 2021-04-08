package com.bookstore.controller.author;

import com.bookstore.jpa.author.Author;
import com.bookstore.jpa.author.AuthorRepository;
import com.bookstore.jpa.book.Book;


import com.bookstore.utils.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:test.properties")
public class AuthorControllerTest {

    @Autowired
    private MockMvc mvc;
    @Autowired
    AuthorRepository repo;

    @Before
    public void setup() {
        Collection<Book> books1 = new ArrayList<>();
        Collection<Book> books2 = new ArrayList<>();
        Collection<Book> books3 = new ArrayList<>();
        Collection<Book> books4 = new ArrayList<>();

        Book b = new Book("Harry Potter", "You are a wizard harry");
        books1.add(b);
        Author a = new Author("Ahmed", "Romih", books1);

        Book b2 = new Book("Some random book", "You are a wizard ahmed");
        books2.add(b2);
        Author a2 = new Author("Cool", "Bro", books2);

        Book b3 = new Book("Naruto Shounen Jump", "Ninja stuff");
        books3.add(b3);
        Author a3 = new Author("Uzumaki", "Naruto", books3);

        Book b4 = new Book("Death Note", "Detective stuff");
        books4.add(b4);
        Author a4 = new Author("Yagami", "Light", books4);

        repo.save(a);
        repo.save(a2);
        repo.save(a3);
        repo.save(a4);
    }

    @Test
    public void testGetAuthors() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/api/authors")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstName").value("Ahmed"));
    }

    @Test
    public void testGetAuthorById() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/api/author")
                .param("id", "2")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Cool"));
        ;
    }

    @Test
    public void testCreateAuthor() throws Exception {
        Collection<Book> books = new ArrayList<>();
        Book someBook = new Book("Fairy Tale", "Some random description");
        books.add(someBook);
        Author someAuthor = new Author("Jack", "Black", books);

        mvc.perform(MockMvcRequestBuilders
                .post("/api/create-author")
                .content(ObjectMapper.asJsonString(someAuthor))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Jack"));
    }

    @Test
    public void testUpdateAuthor() throws Exception {
        Author updateAuthor = new Author();
        updateAuthor.setFirstName("Updated First Name");
        updateAuthor.setLastName("Updated Last Name");

        mvc.perform(MockMvcRequestBuilders
                .put("/api/update-author")
                .param("id", "3")
                .content(ObjectMapper.asJsonString(updateAuthor))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.firstName").value("Updated First Name"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.lastName").value("Updated Last Name"));
    }

    @Test
    public void testDeleteAuthor() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .delete("/api/remove-author")
                .param("id", "4")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    public void testGetAuthorsByFirstName() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/api/authorsByFirstName")
                .param("firstName", "Ahmed")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstName").value("Ahmed"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lastName").value("Romih"));
    }

    @Test
    public void testGetAuthorsByLastName() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/api/authorsByLastName")
                .param("lastName", "Romih")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstName").value("Ahmed"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lastName").value("Romih"));
    }

    @Test
    public void testGetAuthorsByFirstAndLastName() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                .get("/api/authorsByFirstAndLastName")
                .param("firstName", "Cool")
                .param("lastName", "Bro")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].firstName").value("Cool"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].lastName").value("Bro"));
    }
}
