package store.oneul.mvc.upload.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import store.oneul.mvc.upload.dto.PresignedUrlResponse;
import store.oneul.mvc.upload.util.S3PresignedUrlGenerator;

@RestController 
@RequestMapping("/api/presigned")
@RequiredArgsConstructor
public class UploadController {
    private final S3PresignedUrlGenerator s3PresignedUrlGenerator;

    @PostMapping("/upload")
    public PresignedUrlResponse getPresignedUrl(@RequestBody Map<String, String> request) {   
        return s3PresignedUrlGenerator.generatePresignedUrl(
            request.get("filename"), 
            request.get("contentType")
        );
    }
}

