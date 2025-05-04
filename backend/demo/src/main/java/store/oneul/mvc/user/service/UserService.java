package store.oneul.mvc.user.service;

import store.oneul.mvc.user.dto.UserDTO;

public interface UserService {
    boolean existsByEmail(String email);
    void insertUser(UserDTO user);
    UserDTO findByEmail(String email);
    void updateUserInfo(UserDTO user);
    UserDTO findById(Long userId);
}
