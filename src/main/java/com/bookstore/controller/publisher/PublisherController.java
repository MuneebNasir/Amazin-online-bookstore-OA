package com.bookstore.controller.publisher;
import com.bookstore.jpa.author.Author;
import com.bookstore.jpa.publisher.Publisher;
import com.bookstore.jpa.publisher.PublisherRepository;
import com.bookstore.utils.StringUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Collection;


/**
 * The Publishers Rest API Controller
 * @author Muneeb Nasir
 * @version 4806.1
 */
@Controller
public class PublisherController {

    @Autowired
    private PublisherRepository publisherRepo;

    /**
     * Getter for all publishers in the Database
     * @param model, Model Attribute
     * @return Thymeleaf Page
     */
    @GetMapping(path = "/api/publishers")
    public String publishersView(Model model) {

        Collection<Publisher> publishers = publisherRepo.findAll();
        model.addAttribute("allPublishers", publishers);

        // Empty Publishers Object - namespace
        model.addAttribute("newPublisher", new Publisher());
        return "publishers";
    }

    /**
     * Adding new publisher entity
     */
    @PostMapping(path = "/api/addNewPublisher", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<HttpStatus> addNewPublisher(@RequestBody Publisher publisher) {

        Publisher newPublisher = new Publisher(publisher.getName(), publisher.getLocation());
        publisherRepo.save(newPublisher);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Getter for Publishers IDs
     */
    @GetMapping(path = "/api/retrieveAllPublisherIDs", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Collection> retrieveAllPublisherIDs() {
        ArrayList publisherCollection = new ArrayList<>();
        for (Publisher pub: publisherRepo.findAll()){
            publisherCollection.add(pub.getId());
        }

        return new ResponseEntity<>(publisherCollection, HttpStatus.OK);
    }

    /**
     * Getter for Publishers
     */
    @GetMapping(path = "/api/publishersViewAll", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Collection> retrieveAllPublisherDetails() {

        Collection<Publisher> publishers = publisherRepo.findAll();
        return new ResponseEntity<>(publishers, HttpStatus.OK);
    }

    /**
     * Post for updating publisher entities
     */
    @PutMapping(path = "/api/updatePublisher/{id}", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<Publisher> updatePublisher(@RequestBody Publisher publisher,
                                                     @PathVariable("id") long id) {

        Publisher publisherToUpdate = publisherRepo.findById(id);
        if (publisherToUpdate == null) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }

        if (!StringUtility.isBlank(publisher.getName())) {
            publisherToUpdate.setName(publisher.getName());
        }
        if (!StringUtility.isBlank(publisher.getLocation())) {
            publisherToUpdate.setLocation(publisher.getLocation());
        }

        publisherRepo.save(publisherToUpdate);

        return new ResponseEntity<>(publisherToUpdate, HttpStatus.OK);
    }

    /**
     * Getter for Publishers with specified ID
     */
    @GetMapping(path = "/api/publisher/{id}")
    @ResponseBody
    ResponseEntity<Publisher> getById(@PathVariable("id") long id) {

        return new ResponseEntity<>(publisherRepo.findById(id), HttpStatus.OK);
    }

    /**
     * Removing publisher entity
     */
    @DeleteMapping(path = "/api/removePublisher")
    @ResponseBody
    ResponseEntity<HttpStatus> removePublisher(@RequestParam(name = "id") Long id) {

        publisherRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
