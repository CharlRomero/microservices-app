package com.espe.msvc.courses.clients;

import com.espe.msvc.courses.models.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "msvc-users", url = "msvc-users:8001")
public interface UserClientRest {
    @GetMapping("/{id}")
    User detail(@PathVariable Long id);

    @PostMapping
    User create(@RequestBody User user);
}
