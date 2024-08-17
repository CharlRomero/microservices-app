package com.espe.msvc.users.repositories;

import com.espe.msvc.users.models.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}
