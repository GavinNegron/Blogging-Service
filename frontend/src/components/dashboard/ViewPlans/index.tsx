import DefaultButton from "@/components/ui/buttons/default/DefaultButton";
import styles from './styles.module.sass';

export default function ViewPlansBanner() {

  return (
    <>
        <div className={`${styles["banner"]} d-flex`}>
            <div className="d-flex ai-center">
              <div className="banner__item">
                  <span>You are currently using the free plan. Paid plans offer additional features.</span>
              </div>
            </div>
            <div>
              <DefaultButton background="#ffffff30" hover="#ffffff17">View Plans</DefaultButton>
            </div>
        </div>
    </>
  )
}