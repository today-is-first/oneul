package store.oneul.mvc.upload.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class PresignedUrlResponse {
    private String presignedUrl;
    private String objectKey;
}