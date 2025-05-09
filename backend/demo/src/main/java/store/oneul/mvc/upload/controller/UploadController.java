package store.oneul.mvc.upload.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import store.oneul.mvc.upload.dto.PresignedUrlResponse;
import store.oneul.mvc.upload.util.S3PresignedUrlGenerator; 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Map;

@RestController 
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class UploadController {
    private final S3PresignedUrlGenerator s3PresignedUrlGenerator;

    @PostMapping("/presigned-url")
    public PresignedUrlResponse getPresignedUrl(@RequestBody Map<String, String> request) {   
        return s3PresignedUrlGenerator.generatePresignedUrl(
            request.get("filename"), 
            request.get("contentType")
        );
    }
}

