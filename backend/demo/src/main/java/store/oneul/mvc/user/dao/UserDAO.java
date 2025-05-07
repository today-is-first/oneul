package store.oneul.mvc.user.dao;

import org.apache.ibatis.annotations.Mapper;
import store.oneul.mvc.user.dto.UserDTO;

@Mapper
public interface UserDAO {
    UserDTO findByEmail(String email);
    void insertUser(UserDTO user);
    void updateUserInfo(UserDTO user); // 닉네임, 전화번호 입력용
    UserDTO findById(Long userId);

}
