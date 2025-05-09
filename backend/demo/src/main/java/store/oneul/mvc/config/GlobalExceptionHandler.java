// backend/demo/src/main/java/store/oneul/mvc/config/GlobalExceptionHandler.java
package store.oneul.mvc.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<String>> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ApiResponse.error("서버 오류: " + ex.getMessage(), ErrorCode.INTERNAL_SERVER_ERROR.name()));
    }
    // 필요시 커스텀 예외 추가
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<String>> handleUserNotFoundException(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(ApiResponse.error("사용자를 찾을 수 없습니다: " + ex.getMessage(), ErrorCode.USER_NOT_FOUND.name()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(ApiResponse.error("잘못된 요청 파라미터: " + ex.getMessage(), ErrorCode.INVALID_PARAMETER.name()));
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ApiResponse<String>> handleDuplicateEmailException(DuplicateEmailException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body(ApiResponse.error("이메일이 중복되었습니다: " + ex.getMessage(), ErrorCode.DUPLICATE_EMAIL.name()));
    }

    @ExceptionHandler(ImageUploadException.class)
    public ResponseEntity<ApiResponse<String>> handleImageUploadException(ImageUploadException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(ApiResponse.error("이미지 업로드 실패: " + ex.getMessage(), ErrorCode.IMAGE_UPLOAD_FAIL.name()));
    }
}