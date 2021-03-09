package BookStore.Controller;
import BookStore.JPA.Book;
import BookStore.JPA.BookRepository;
import BookStore.JPA.Publisher;
import BookStore.JPA.PublisherRepository;
import BookStore.Utils.RequestResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

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
    public RequestResponse addNewPublisher(@RequestBody Publisher publisher) {

        Publisher newPublisher = new Publisher(publisher.getName(), publisher.getLocation());
        publisherRepo.save(newPublisher);

        return new RequestResponse("OK", newPublisher);
    }

    @GetMapping(path = "/AmazinBookStore-publishersAll", produces = "application/json")
    @ResponseBody
    public RequestResponse all() {
        ArrayList publisherCollection = new ArrayList<>();
        for (Publisher pub: publisherRepo.findAll()){
            publisherCollection.add(pub.getId());
        }
        return new RequestResponse("OK", publisherCollection);
    }

    @GetMapping(path = "/AmazinBookStore-publishersViewAll", produces = "application/json")
    @ResponseBody
    public RequestResponse addressBooksViewAll() {

        Collection<Publisher> publishers = publisherRepo.findAll();
        return new RequestResponse("OK", publishers);
    }

    @PostMapping(path = "/AmazinBookStore-updatePublisher", consumes = "application/json")
    @ResponseBody
    public RequestResponse updatePublisher(@RequestBody Publisher publisher) {

        Publisher tempPublisher = publisherRepo.findById(publisher.getId());
        tempPublisher.setName(publisher.getName());
        publisherRepo.save(tempPublisher);

        return new RequestResponse("OK", tempPublisher);
    }


}
