package com.espe.msvc.users.services;

import com.espe.msvc.users.models.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getUsers();
    Optional<User> getById(long id);
    User save(User user);
    void delete(Long id);
}
