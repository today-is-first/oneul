package store.oneul.mvc.workoutLog.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data        
@Builder     
@NoArgsConstructor 
@AllArgsConstructor
public class WorkoutLogDTO {
	private Long id;
	private Long userId;
	private Long challengeId;
	private Long feedId;
	private String comment;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
}
