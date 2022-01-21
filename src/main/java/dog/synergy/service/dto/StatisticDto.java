package dog.synergy.service.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class StatisticDto {
    private final Long userCountActivated;
    private final Long userCountNotActivated;
    private final Long tasks;
}
