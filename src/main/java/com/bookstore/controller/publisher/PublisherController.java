package com.bookstore.controller.publisher;
import com.bookstore.jpa.publisher.Publisher;
import com.bookstore.jpa.publisher.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Collection;


/**
 * The Publisher Rest API Controller
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

        // Empty Publisher Object - namespace
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
     * Getter for Publisher IDs
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

        Publisher tempPublisher = publisherRepo.findById(id);
        if (tempPublisher == null) {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }

        if (!publisher.getName().isEmpty() && !publisher.getLocation().isEmpty()){

            tempPublisher.setName(publisher.getName());
            tempPublisher.setLocation(publisher.getLocation());

        }
        publisherRepo.save(tempPublisher);

        return new ResponseEntity<>(tempPublisher, HttpStatus.OK);
    }

    /**
     * Getter for Publisher with specified ID
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
