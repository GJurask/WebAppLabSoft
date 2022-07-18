namespace WebApplication2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class work_12 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Sample", "SampleConclusionId", c => c.Int());
            CreateIndex("dbo.Sample", "SampleConclusionId");
            AddForeignKey("dbo.Sample", "SampleConclusionId", "dbo.SampleConclusion", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Sample", "SampleConclusionId", "dbo.SampleConclusion");
            DropIndex("dbo.Sample", new[] { "SampleConclusionId" });
            DropColumn("dbo.Sample", "SampleConclusionId");
        }
    }
}
