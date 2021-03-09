package com.bookstore.controller.publisher;
import com.bookstore.jpa.book.BookRepository;
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
    private BookRepository repository;

    @Autowired
    private PublisherRepository publisherRepo;

    /**
     * Getter for all publishers in the Database
     * @param model
     * @return Thymeleaf Page
     */
    @GetMapping(path = "/AmazinBookStore-publishers")
    public String addressBookView(Model model) {

        Collection<Publisher> publishers = publisherRepo.findAll();
        model.addAttribute("allPublishers", publishers);

        // Empty Publisher Object - namespace
        model.addAttribute("newPublisher", new Publisher());
        return "AmazinBookStore-publishers";
    }

    @PostMapping(path = "/AmazinBookStore-addNewPublisher", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<HttpStatus> addNewPublisher(@RequestBody Publisher publisher) {

        Publisher newPublisher = new Publisher(publisher.getName(), publisher.getLocation());
        publisherRepo.save(newPublisher);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/AmazinBookStore-AllIDs", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Collection> all() {
        ArrayList publisherCollection = new ArrayList<>();
        for (Publisher pub: publisherRepo.findAll()){
            publisherCollection.add(pub.getId());
        }

        return new ResponseEntity<>(publisherCollection, HttpStatus.OK);
    }

    @GetMapping(path = "/AmazinBookStore-publishersViewAll", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Collection> addressBooksViewAll() {

        Collection<Publisher> publishers = publisherRepo.findAll();
        return new ResponseEntity<>(publishers, HttpStatus.OK);
    }

    @PostMapping(path = "/AmazinBookStore-updatePublisher/{id}", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<Publisher> updatePublisher(@RequestBody Publisher publisher,
                                                     @PathVariable("id") long id) {

        Publisher tempPublisher = publisherRepo.findById(id);
        if (tempPublisher == null){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
        if (!publisher.getName().isEmpty() || !publisher.getLocation().isEmpty()){

            tempPublisher.setName(publisher.getName());
            tempPublisher.setLocation(publisher.getLocation());

        }
        publisherRepo.save(tempPublisher);

        return new ResponseEntity<>(tempPublisher, HttpStatus.OK);
    }

    @GetMapping(path = "/AmazinBookStore-publisher/{id}")
    @ResponseBody
    ResponseEntity<Publisher> getById(@PathVariable("id") long id) {

        return new ResponseEntity<>(publisherRepo.findById(id), HttpStatus.OK);
    }

    @DeleteMapping(path = "/AmazinBookStore-removePublisher")
    @ResponseBody
    ResponseEntity<HttpStatus> removePublisher(@RequestParam(name = "id") Long id) {

        publisherRepo.deleteById(id);
        return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);
    }

}
