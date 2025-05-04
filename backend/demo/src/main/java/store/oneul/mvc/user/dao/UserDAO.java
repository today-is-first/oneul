package store.oneul.mvc.user.dao;


import store.oneul.mvc.user.dto.UserDTO;

public interface UserDAO {
    UserDTO findByEmail(String email);
    void insertUser(UserDTO user);
    void updateUserInfo(UserDTO user); // 닉네임, 전화번호 입력용
    UserDTO findById(Long userId);

}
