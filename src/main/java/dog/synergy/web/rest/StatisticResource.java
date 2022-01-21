package dog.synergy.web.rest;

import dog.synergy.service.StatisticsService;
import dog.synergy.service.dto.StatisticDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/")
@Slf4j
public class StatisticResource {

    private final StatisticsService statisticsService;

    @GetMapping("statistics")
    public ResponseEntity<StatisticDto> getStatistic() {
        return ResponseEntity.ok(statisticsService.getAllStatistic());
    }

}
