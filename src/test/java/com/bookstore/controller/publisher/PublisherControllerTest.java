package com.bookstore.controller.publisher;
import com.bookstore.jpa.author.Author;
import com.bookstore.jpa.author.AuthorRepository;
import com.bookstore.jpa.book.Book;
import com.bookstore.jpa.publisher.Publisher;
import com.bookstore.jpa.publisher.PublisherRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * The Publishers Controller Tests
 * @author Muneeb Nasir
 * @version 4806.1
 */

@SpringBootTest
@TestPropertySource(locations = "classpath:test.properties")
@AutoConfigureMockMvc
public class PublisherControllerTest {

    @Autowired
    private MockMvc publisherController;

    @Autowired
    PublisherRepository repo;


    Publisher publisher = new Publisher("Ahmed", "Ottawa");
    Publisher publisher2 = new Publisher("Jay", "Ottawa");
    Publisher publisher3 = new Publisher("Trump", "NYC");
    Publisher publisher4 = new Publisher("Muneeb", "LA");

    @Before
    public void setup() {


        repo.save(publisher);
        repo.save(publisher2);
        repo.save(publisher3);
        repo.save(publisher4);
    }

    @Test
    public void testGetPublisherByID() throws Exception
    {
        publisherController.perform( MockMvcRequestBuilders
                .get("/api/publisher/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetAllPublisherByID() throws Exception
    {

        publisherController.perform(MockMvcRequestBuilders
                .post("/api/addNewPublisher")
                .content(asJsonString(publisher))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());


        publisherController.perform(MockMvcRequestBuilders
                .post("/api/addNewPublisher")
                .content(asJsonString(publisher2))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());


        publisherController.perform(MockMvcRequestBuilders
                .post("/api/addNewPublisher")
                .content(asJsonString(publisher3))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        publisherController.perform( MockMvcRequestBuilders
                .get("/api/retrieveAllPublisherIDs")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$[*]").exists());
    }

    @Test
    public void testEmptyNewPublisher() throws Exception {
        Publisher publisher = new Publisher();
        publisherController.perform(MockMvcRequestBuilders
                .post("/api/addNewPublisher")
                .content(asJsonString(publisher))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());
    }

    @Test
    public void testAddingNewPublisher() throws Exception {
        publisherController.perform(MockMvcRequestBuilders
                .post("/api/addNewPublisher")
                .content(asJsonString(publisher))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());
    }


    @Test
    public void testUpdateModifyPublisherInfo() throws Exception
    {

        // Updating Existing Entry Location
        publisher4.setLocation("NYC");
        publisherController.perform(MockMvcRequestBuilders
                .put("/api/updatePublisher/{id}",1)
                .content(asJsonString(publisher4))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());

        // Confirming the Location Change Has Been Updated
        publisherController.perform( MockMvcRequestBuilders
                .get("/api/publisher/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.location").value("NYC"))
                .andExpect(status().isOk());

        // Updating Existing Entry Name
        publisher4.setName("Nasir");
        publisherController.perform(MockMvcRequestBuilders
                .put("/api/updatePublisher/{id}",1)
                .content(asJsonString(publisher4))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk());

        // Confirming the Location Change Has Been Updated
        publisherController.perform( MockMvcRequestBuilders
                .get("/api/publisher/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.location").value("NYC"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Nasir"))
                .andExpect(status().isOk());
    }

    @Test
    public void testRemovePublisher() throws Exception
    {
        publisherController.perform(MockMvcRequestBuilders
                .post("/api/addNewPublisher")
                .content(asJsonString(publisher4))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        Publisher publisher2 = new Publisher("Joe", "Toronto");
        publisherController.perform(MockMvcRequestBuilders
                .post("/api/addNewPublisher")
                .content(asJsonString(publisher2))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        publisherController.perform(
                MockMvcRequestBuilders.delete("/api/removePublisher")
                        .param("id", "2"))
                .andExpect(status().isOk());

        // GET REQUEST to ensure the specified friend is deleted
        publisherController.perform( MockMvcRequestBuilders
                .get("/api/publisher/{id}", 2)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").doesNotExist());
    }

    @Test
    public void testGetAllPublishersDetails() throws Exception
    {
        publisherController.perform(MockMvcRequestBuilders
                .post("/api/addNewPublisher")
                .content(asJsonString(publisher4))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        publisherController.perform(MockMvcRequestBuilders
                .post("/api/addNewPublisher")
                .content(asJsonString(publisher))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated());

        publisherController.perform( MockMvcRequestBuilders
                .get("/api/publishersViewAll")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(MockMvcResultMatchers.jsonPath("$[*].id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$[*].name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$[*].location").exists());
    }

    @Test
    public void testPublisherByName() throws Exception {
        publisherController.perform(MockMvcRequestBuilders
                .get("/api/searchPublisherByName")
                .param("name", "Ahmed")
                .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").value("Ahmed"))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].location").value("Ottawa"));
    }


    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}