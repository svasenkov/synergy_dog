package dog.synergy.repository;

import dog.synergy.domain.Board;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Board entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("select board from Board board where board.user.login = ?#{principal.username}")
    List<Board> findByUserIsCurrentUser();
}
