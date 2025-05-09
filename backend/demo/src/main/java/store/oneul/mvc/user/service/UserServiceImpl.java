package store.oneul.mvc.user.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.user.dao.UserDAO;
import store.oneul.mvc.user.dto.UserDTO;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserDAO userDAO;

    @Override
    public boolean existsByEmail(String email) {
        return userDAO.findByEmail(email) != null;
    }

    @Override
    public void insertUser(UserDTO user) {
        userDAO.insertUser(user);
    }

    @Override
    public UserDTO findByEmail(String email) {
        return userDAO.findByEmail(email);
    }

    @Override
    public void updateUserInfo(UserDTO user) {
        userDAO.updateUserInfo(user);
    }
    
    @Override
    public UserDTO findById(Long userId) {
        return userDAO.findById(userId);
    }
    
 

}
