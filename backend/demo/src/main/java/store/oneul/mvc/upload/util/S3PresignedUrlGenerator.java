package store.oneul.mvc.upload.util;

import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;
import org.springframework.stereotype.Component;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import java.net.URL;
import java.time.Duration;
import java.util.UUID;
import store.oneul.mvc.upload.config.AwsProperties;
import store.oneul.mvc.upload.dto.PresignedUrlResponse;

@Component
@Data
@RequiredArgsConstructor
public class S3PresignedUrlGenerator {
    private final AwsProperties awsProperties;
    private final Duration signatureDuration = Duration.ofMinutes(5);
    private final S3Presigner presigner;

    public PresignedUrlResponse generatePresignedUrl(String filename, String contentType) {
        String uuid = UUID.randomUUID().toString();
        String extension = filename.substring(filename.lastIndexOf('.'));
        String objectKey = "uploads/" + uuid + extension;

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(awsProperties.getBucketName())
                .key(objectKey)
                .contentType(contentType)
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(signatureDuration)
                .putObjectRequest(putObjectRequest)
                .build();

        URL presignedUrl = presigner.presignPutObject(presignRequest).url();
        return new PresignedUrlResponse(presignedUrl.toString(), objectKey);
    }
}
