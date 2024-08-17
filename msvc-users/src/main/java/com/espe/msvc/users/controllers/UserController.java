package com.espe.msvc.users.controllers;

import com.espe.msvc.users.models.entity.User;
import com.espe.msvc.users.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> users(){
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable Long id){
        Optional<User> userOptional = userService.getById(id);
        if(!userOptional.isPresent())
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().body(userOptional.get());
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody User user, BindingResult result){
        if(result.hasErrors())
            return check(result);
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody User user, @PathVariable Long id){
        Optional<User> userOptional = userService.getById(id);
        if(!userOptional.isPresent())
            return ResponseEntity.notFound().build();

        User userDB = userOptional.get();
        userDB.setName(user.getName());
        userDB.setEmail(user.getEmail());
        userDB.setPassword(user.getPassword());

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userDB));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<User> optionalUser = userService.getById(id);
        if(!optionalUser.isPresent())
            return ResponseEntity.notFound().build();

        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    private static ResponseEntity<Map<String, String>> check(BindingResult result){
        Map<String, String> errors = new HashMap<>();
        result.getFieldErrors().forEach(err ->{
            errors.put(err.getField(), "The field " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
